export class TagGroup {
    public tagsInText: string;

    constructor(
        public groupRegistry,
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
            ...this.inheritGroupNames.map((each) =>
                this.groupRegistry.getGroupByName(each).getTags()
            )
        );
    }

    toggleInheritGroup(groupName: string) {
        if (
            this.groupRegistry.getGroupByName(groupName).inheritGroupNames.indexOf(this.name) > -1
        ) {
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
