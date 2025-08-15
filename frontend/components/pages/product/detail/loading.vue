<template>
    <div class="flex gap-4">
        <div class="w-1/3">
            <Skeleton class="h-80" />
        </div>
        <div class="w-2/3 flex flex-col gap-4">
            <div class="flex gap-2">
                <Skeleton class="w-[110px] h-4" />
                <Skeleton class="w-[80px] h-4" />
                <Skeleton class="w-[180px] h-4" />
            </div>
            <Skeleton class="w-[380px] h-8" />
            <Skeleton class="w-[80px] h-4" />
            <Skeleton class="w-full h-5" />
            <Skeleton class="w-full h-5" />
            <Skeleton class="w-full h-5" />
            <Skeleton class="w-[380px] h-5" />
            <div class="flex gap-3 items-center">
                <Skeleton class="w-[180px] h-12" />
                <Skeleton class="w-8 h-8" />
            </div>
        </div>
    </div>
</template>