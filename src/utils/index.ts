import { getCurrentInstance } from "vue";
export default (prop: any) => {
    const data = getCurrentInstance()!.appContext.config.globalProperties
    return data[prop];
}
