<script lang="ts" setup>
    interface FileUploadProps {
        name: string,
        label: string,
        accepts?: string,
        multiple?: boolean
    }

    defineProps<FileUploadProps>()
    const fileList = defineModel<UploadingFile[]>('files', {
        default: []
    })

    const handleFileChange = (e: Event) => {
        const files = (e.target as HTMLInputElement).files

        if (files)
            Array.prototype.forEach.call(files, async (file) => {
                fileList.value.push(await getBase64(file))
            })
    }

    const getBase64 = (file: File): Promise<UploadingFile> => new Promise((resolve) => {
        let dataURL: string = ''
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            dataURL = reader.result as string
            resolve({ name: file.name, dataURL })
        }
    })

    const removeFile = (index: number) => {
        fileList.value.splice(index, 1)
    }

</script>

<template>
    <div class="form__group">
        <label class="custom__file">
            <input type="file" @change="handleFileChange" :name="name" :multiple="multiple" />
            <div class="custom__file__text">
                <span v-if="fileList.length == 0">{{ label }}</span>
                <div class="text--left" v-else>
                    <template v-if="multiple">
                        <strong>Selected files ({{ fileList.length }})</strong>
                        <ol class="custom__file__list">
                            <li class="custom__file__list__item" v-for="(file, index) in fileList">
                                {{ file.name }}
                                <a href="#" @click.prevent="removeFile(index)"><span class="icon-add"></span></a>
                            </li>
                        </ol>
                    </template>
                    <span class="custom__file__list__item" v-else>
                        {{ fileList[0].name }}
                        <a href="#" @click.prevent="removeFile(0)"><span class="icon-add"></span></a>
                    </span>
                </div>
            </div>
        </label>
    </div>
</template>