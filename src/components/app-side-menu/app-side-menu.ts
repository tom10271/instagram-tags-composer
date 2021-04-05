import { Options, Vue } from 'vue-class-component';
import { MenuItem } from '@/components/app-side-menu/MenuItem';

@Options({
    name: 'app-side-menu',
    props: {
        menuItems: Object,
    },
})
export default class AppSideMenuComponent extends Vue {
    menuItems: MenuItem[];

    mounted() {
        if (this.menuItems) {
            this.closeAllExpansion();
        }
    }

    closeAllExpansion() {
        this.menuItems.forEach((each) => (each.isExpanded = false));
    }

    toggleExpansion(item) {
        if (item.isExpanded) {
            item.isExpanded = false;
        } else {
            this.closeAllExpansion();

            item.isExpanded = true;
        }
    }
}
