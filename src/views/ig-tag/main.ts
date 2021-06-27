import { Options, Vue } from 'vue-class-component';
import { groupRegistry } from '@/views/ig-tag/Models/TagGroup';

@Options({})
export default class MainComponent extends Vue {
    results: string[] = [];

    groupRegistry = groupRegistry;

    mounted() {
        this.groupRegistry.restoreFromLocalStorage();
    }

    restoreFromJSON() {
        this.groupRegistry.restoreFromJSON();
    }

    unmounted() {
        this.groupRegistry.save();
    }
}
