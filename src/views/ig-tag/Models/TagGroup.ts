import { reactive } from 'vue';

export class TagGroupRegistry {
    key = 'ig-tags-json';

    registry: TagGroup[] = [];

    getGroupByName(name: string): TagGroup {
        return this.registry.filter((each) => each.name === name)[0];
    }

    addGroup(name: string) {
        this.registry.push(new TagGroup(name));
    }

    restore() {
        this.registry = [];

        JSON.parse(localStorage.getItem(this.key) || '[]').forEach((each) => {
            this.registry.push(
                new TagGroup(each.name, each.tags, each.inheritGroupNames, each.enabled)
            );
        });
    }

    save() {
        const json = JSON.stringify(
            this.registry
                .filter((each) => each.name + each.tags + each.inheritGroupNames)
                .map((each) => ({
                    name: each.name,
                    tags: each.tags,
                    inheritGroupNames: each.inheritGroupNames,
                    enabled: each.enabled,
                }))
        );

        localStorage.setItem(this.key, json);
    }

    resolveResults() {
        const result = new Set();

        this.registry
            .filter((each) => each.enabled)
            .forEach((each) => each.getTags().forEach((tag) => result.add(tag)));

        return Array.from(result.values());
    }
}

export class TagGroup {
    public tagsInText: string;

    constructor(
        public name: string,
        public tags: string[] = [],
        public inheritGroupNames: string[] = [],
        public enabled: boolean = false
    ) {
        this.tagsInText = this.tags.join(', ');
    }

    updateTagsByTexts() {
        this.tags = this.tagsInText.split(', ').map((each) => each.trim());
    }

    addGroupName(name: string) {
        this.inheritGroupNames.splice(this.inheritGroupNames.indexOf(name), 1);
    }

    getTags(): string[] {
        return this.tags.concat(
            ...this.inheritGroupNames.map((each) => groupRegistry.getGroupByName(each).getTags())
        );
    }

    toggleInheritGroup(groupName: string) {
        if (groupRegistry.getGroupByName(groupName).inheritGroupNames.indexOf(this.name) > -1) {
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
