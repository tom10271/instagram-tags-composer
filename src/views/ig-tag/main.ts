import { Options, Vue } from 'vue-class-component';
import { groupRegistry } from './Models/TagGroupRegistry';

@Options({
    watch: {
        showHJsonTextEditor() {
            this.jsonToRestore = this.groupRegistry.convertTagGroupsToJSON();
        },
    },
})
export default class MainComponent extends Vue {
    results: string[] = [];
    jsonToRestore: string = '';
    showHJsonTextEditor: boolean = false;

    groupRegistry = groupRegistry;

    mounted() {
        this.groupRegistry.restoreFromLocalStorage();
    }

    onRowReorder(event, group) {
        group.tags = event.value;
        group.tags.forEach((each, i) => (each.score = i));
    }

    unmounted() {
        this.groupRegistry.save();
    }
}
