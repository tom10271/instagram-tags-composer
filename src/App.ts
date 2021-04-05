import { Options, Vue } from 'vue-class-component';
import AppSideMenu from '@/components/app-side-menu/app-side-menu.vue';
import AppSideMenuComponent from '@/components/app-side-menu/app-side-menu';
import { MenuItem } from '@/components/app-side-menu/MenuItem';

@Options({
    name: 'app',
    components: {
        AppSideMenu,
    },
})
export default class AppComponent extends Vue {
    isOpeningModuleMenu = false;
    currentModule: MenuItem = null;

    items: MenuItem[] = [
        new MenuItem({
            label: 'Home',
            to: '/',
        }),
        new MenuItem({
            label: 'Instagram tag composer',
            to: '/instagram-tag-composer',
        }),
    ];

    toggleModuleMenu() {
        if (this.$refs.moduleMenu) {
            (this.$refs.moduleMenu as AppSideMenuComponent).closeAllExpansion();
        }

        this.isOpeningModuleMenu = !this.isOpeningModuleMenu;
    }

    onModuleChanged(item: MenuItem) {
        this.currentModule = item.parent ? item.parent : item;
    }
}
