<script setup lang="ts">
    import Modal from '~/components/Modal.vue'
    import RateForm from './form.vue'

    interface ProductRateProps {
        prices: any
    }

    const emit = defineEmits(['update'])
    const props = defineProps<ProductRateProps>()
    const showAddModal = ref(false)

    const onSubmit = () => {
        showAddModal.value = false
        emit('update')
    }

</script>

<template>
    <div class="content__block">
        <div class="content__block__title">
            <h2>Rates</h2>
            <a href="#" class="btn btn__primary btn--outline" @click="showAddModal = true" v-if="prices?.length == 0">
                <MdiIcon icon="mdiPlus" size="24" />
                Add Rate
            </a>
        </div>
        <div class="datatable__body">
            <table>
                <thead>
                    <th class="sn"></th>
                    <th class="text--left">Amount</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="(price, index) in prices">
                        <td class="sn">{{ index + 1 }}</td>
                        <td>${{ price.price.amount }}</td>
                        <td class="text--right">
                            <a class="btn btn--xs btn__info" href="#" @click.prevent>
                                <MdiIcon icon="mdiPencil" size="16" />
                                Edit
                            </a>
                            <a class="btn btn--xs btn__danger" href="#" @click.prevent>
                                <MdiIcon icon="mdiDelete" size="16" />
                                Delete
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Modal :show="showAddModal" @modal:close="showAddModal = false">
            <RateForm @update="onSubmit" />
        </Modal>
    </div>
</template>