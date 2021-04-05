import { reactive } from 'vue';

export class TagGroupRegistry {
    key = 'ig-tags-json';

    registry: {
        [key: string]: TagGroup;
    } = {};

    addGroup(name: string) {
        this.registry[name] = new TagGroup(name);
    }

    restore() {
        JSON.parse(localStorage.getItem(this.key) || '[]').forEach((each) => {
            this.registry[each.name] = new TagGroup(each.name, each.tags, each.inheritGroupNames);
        });
    }

    save() {
        localStorage.setItem(
            this.key,
            JSON.stringify(
                Object.values(this.registry).map((each) => ({
                    name: each.name,
                    tags: each.tags,
                    inheritGroupNames: each.inheritGroupNames,
                }))
            )
        );
    }

    resolveResults() {
        const result = {};

        []
            .concat(
                ...Object.values(this.registry)
                    .filter((each) => each.enabled)
                    .map((each) => each.getTags())
            )
            .forEach((each) => (result[each] = true));

        return Object.keys(result);
    }
}

export class TagGroup {
    enabled: boolean = false;
    public tagsInText: string;

    constructor(
        public name: string,
        public tags: string[] = [],
        public inheritGroupNames: string[] = []
    ) {
        this.tagsInText = this.tags.join(', ');
    }

    updateTagsByTexts() {
        this.tags = this.tagsInText.split(',').map((each) => each.trim());
    }

    addGroupName(name: string) {
        this.inheritGroupNames.splice(this.inheritGroupNames.indexOf(name), 1);
    }

    getTags(): string[] {
        return this.tags.concat(
            ...this.inheritGroupNames.map((each) => groupRegistry.registry[each].getTags())
        );
    }

    toggleInheritGroup(groupName: string) {
        if (groupRegistry.registry[groupName].inheritGroupNames.indexOf(this.name) > -1) {
            // To prevent stackoverflow and circular dependency

            return;
        }

        const index = this.inheritGroupNames.indexOf(groupName);

        if (index > -1) {
            this.inheritGroupNames.splice(index, 1);
        } else {
            this.inheritGroupNames.push(groupName);
        }
    }
}

export const groupRegistry = reactive(new TagGroupRegistry());
