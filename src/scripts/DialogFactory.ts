import { Component, createApp } from 'vue';
import router from '@/routers';
import store from '@/store';

interface OptionsType {
    propsData: CommonObjectType
    onCancel?: any
    onConfirm?: any
}

export class DialogFactory {
    static createDialog(DialogClass: Component, options: OptionsType) {
        const { propsData = {}, onCancel = null, onConfirm = null } = options;
        const mountNode: HTMLDivElement = document.createElement('div');
        const instance = createApp(DialogClass, {
            modelValue: true,
            ...propsData,
            onCancel: async (data: any) => {
                if (onCancel) {
                    await onCancel(data)
                }
                instance.unmount();
                if (document.body.contains(mountNode)) {
                    document.body.removeChild(mountNode);
                }
            },
            onConfirm: async (data: any) => {
                if (onConfirm) {
                    await onConfirm(data)
                }
                instance.unmount();
                if (document.body.contains(mountNode)) {
                    document.body.removeChild(mountNode);
                }
            }
        });
        instance.use(router);
        instance.use(store);
        document.body.appendChild(mountNode);
        instance.mount(mountNode);
        return instance;
    }
}