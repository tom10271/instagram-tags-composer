export class Tag {
    constructor(public name: string, public score: number = 0) {}
}

export class TagGroup {
    constructor(
        public groupRegistry,
        public name: string,
        public tags: Tag[] = [],
        public inheritGroupNames: string[] = [],
        public enabled: boolean = false
    ) {}

    addGroupName(name: string) {
        this.inheritGroupNames.splice(this.inheritGroupNames.indexOf(name), 1);
    }

    getTags(): Tag[] {
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
