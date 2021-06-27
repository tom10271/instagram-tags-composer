import { reactive } from 'vue';
import { TagGroup } from '@/views/ig-tag/Models/TagGroup';

export class TagGroupRegistry {
    key = 'ig-tags-json';

    registry: TagGroup[] = [];

    getGroupByName(name: string): TagGroup {
        return this.registry.filter((each) => each.name === name)[0];
    }

    addGroup(name: string) {
        this.registry.push(new TagGroup(this, name));
    }

    restoreFromLocalStorage() {
        this.restoreFromJSON(localStorage.getItem(this.key) || '[]');
    }

    restoreFromJSON(json: string) {
        this.registry = [];

        JSON.parse(json).forEach((each) => {
            this.registry.push(
                new TagGroup(this, each.name, each.tags, each.inheritGroupNames, each.enabled)
            );
        });
    }

    convertTagGroupsToJSON() {
        return JSON.stringify(
            this.registry
                .filter((each) => each.name + each.tags + each.inheritGroupNames)
                .map((each) => ({
                    name: each.name,
                    tags: each.tags,
                    inheritGroupNames: each.inheritGroupNames,
                    enabled: each.enabled,
                })),
            null,
            4
        );
    }

    save() {
        localStorage.setItem(this.key, this.convertTagGroupsToJSON());
    }

    resolveResults() {
        const result = new Set();

        this.registry
            .filter((each) => each.enabled)
            .forEach((each) => each.getTags().forEach((tag) => result.add(tag)));

        return Array.from(result.values());
    }
}

export const groupRegistry = reactive(new TagGroupRegistry());
