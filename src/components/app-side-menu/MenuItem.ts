export class MenuItem {
    label?: string;
    to?: any;
    routeName?: string;
    items?: MenuItem[];
    isExpanded?: boolean;
    parent?: MenuItem = null;

    constructor(input: Partial<MenuItem> = {}) {
        for (const key of Object.keys(input)) {
            this[key] = input[key];
        }

        if (input.routeName && !this.to && !this.label) {
            this.to = { name: input };
            this.label = input.routeName;
        }
    }

    addItems(items: Partial<MenuItem>[]) {
        this.items = items.map((item) => {
            item.parent = this;

            return new MenuItem(item);
        });

        return this;
    }
}
