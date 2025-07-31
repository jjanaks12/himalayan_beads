<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, RefreshCcwIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'

    import { orderStatus } from '~/lib/data'
    import { formatDate, humanize, humanizeOrderAddress } from '~/lib/filters'
    import { useOrderStore } from '~/store/orderStore'
    import { useAuthStore } from '~/store/auth'
    import type { Order } from '~/himalayan_beads'

    import OrderDetail from '@/components/pages/dashboard/order/detail.vue'

    const { isLoading, orders, params } = storeToRefs(useOrderStore())
    const { can } = useAuthorization()
    const { user } = storeToRefs(useAuthStore())
    const { updateStatus, deleteOrder } = useOrderStore()
    const emit = defineEmits(['update'])

    const isOrderDeleteOpened = ref(false)
    const isOrderviewOpened = ref(false)
    const orderId = ref<string | null>(null)
    const orderToView = ref<Order | null>(null)
</script>

<template>
    <div class="flex items-center gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                Filters
            </div>
        </div>
        <Button variant="link" @click="emit('update')">
            <RefreshCcwIcon />
            refresh
        </Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="order in orders" v-if="!isLoading">
                <TableCell>
                    <User :user="order.user">
                        <address class="max-w-[200px] not-italic text-xs text-gray-300 text-ellipsis overflow-hidden">
                            {{ humanizeOrderAddress(order.shippingAddress) }}
                        </address>
                        <time :datetime="formatDate(order.createdAt, 'YYYY-MM-DD HH:mm:ss')" class="text-gray-300">
                            {{ formatDate(order.createdAt) }}
                        </time>
                    </User>
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">{{ humanize(order.type.toString()) }}</Badge>
                </TableCell>
                <TableCell>
                    <Badge :variant="orderStatus[order.status]">
                        {{ humanize(order.status.toString()) }}
                    </Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <template
                                v-if="(order.status.toString() != 'COMPLETED') && (order.status.toString() != 'CANCELLED')">
                                <DropdownMenuLabel>
                                    Change status to
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <template v-if="order.status === 'NEW'">
                                    <DropdownMenuItem v-if="can('update_order')"
                                        @click="() => updateStatus('PENDING', order.id)">
                                        pending
                                    </DropdownMenuItem>
                                    <DropdownMenuItem v-if="can('update_order')"
                                        @click="() => updateStatus('PROCESSING', order.id)">
                                        processing
                                    </DropdownMenuItem>
                                </template>
                                <template v-if="order.status == 'PROCESSING' || order.status == 'PENDING'">
                                    <DropdownMenuItem v-if="can('update_order')"
                                        @click="() => updateStatus('COMPLETED', order.id)">
                                        completed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem v-if="can('update_order') || order.userId === user?.id"
                                        @click="() => updateStatus('CANCELLED', order.id)">
                                        cancelled
                                    </DropdownMenuItem>
                                </template>
                                <DropdownMenuSeparator />
                            </template>
                            <DropdownMenuItem v-if="can('view_order') || order.userId === user?.id" @click="() => {
                                isOrderviewOpened = true
                                orderToView = order
                            }">
                                <EyeIcon />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                v-if="can('delete_order') && order.userId === user?.id && order.status != 'COMPLETED'"
                                @click="() => {
                                    isOrderDeleteOpened = true
                                    orderId = order.id
                                }">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow v-else>
                <TableCell>
                    <div class="flex flex-col gap-2">
                        <Skeleton class="h-4 w-[150px]" />
                        <Skeleton class="h-6 w-[250px]" />
                        <Skeleton class="h-3 w-[100px]" />
                    </div>
                </TableCell>
                <TableCell>
                    <Skeleton class="h-3 w-[100px]" />
                </TableCell>
                <TableCell>
                    <Skeleton class="h-3 w-[100px]" />
                </TableCell>
                <TableCell>
                    <Skeleton class="h-8 w-8 ml-auto" />
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ params?.current }} of {{ params?.total_page }} pages
        </div>
        <div class="space-x-2">
            <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                :default-page="params.current" @update:page="(p) => { params = { ...params, current: p } }">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationEllipsis :index="4" />
                    <PaginationNext />
                </PaginationContent>
            </Pagination>
        </div>
    </div>
    <Dialog :open="isOrderDeleteOpened" @update:open="state => {
        isOrderDeleteOpened = state
        orderToView = null
    }">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    Once deleted cannot be un done.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="destructive" @click="() => {
                    isOrderDeleteOpened = false
                    orderToView = null
                }">Cancel</Button>
                <Button variant="secondary" @click="async () => {
                    await deleteOrder(orderId as string)
                    isOrderDeleteOpened = false
                    orderToView = null
                    emit('update')
                }">Yes, delete it</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    <Dialog :open="isOrderviewOpened" @update:open="state => {
        isOrderviewOpened = state
        orderToView = null
    }">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>{{ orderToView?.user.first_name }}'s order</DialogTitle>
                <DialogDescription>
                    Order summary and shipping information.
                </DialogDescription>
            </DialogHeader>
            <OrderDetail :order="orderToView" />
        </DialogContent>
    </Dialog>
</template>