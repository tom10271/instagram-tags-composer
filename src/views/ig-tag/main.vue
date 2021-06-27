<template>
    <div class="grid grid-flow-col grid-cols-12 gap-4">
        <div class="p-md xs:col-span-12 md:col-span-3 lg:col-span-2">
            <section>
                <h3 class="mb-4">
                    Count: {{ groupRegistry.resolveResults().filter((each) => !!each).length }}
                </h3>

                <section class="resolved-tags-container overflow-auto">
                    <p
                        class="mb-2"
                        v-for="each in groupRegistry
                            .resolveResults()
                            .filter((each) => !!each)
                            .map((each) => '#' + each.name)"
                        :key="each"
                    >
                        {{ each }}
                    </p>
                </section>
            </section>
        </div>

        <div class="p-md xs:col-span-12 md:col-span-9 lg:col-span-10">
            <section class="select-none">
                <nav class="flex mb-md">
                    <h1 class="flex-grow">Groups</h1>

                    <button
                        class="ml-md bg-gray-200 rounded py-xs px-sm"
                        @click="showHJsonTextEditor = !showHJsonTextEditor"
                    >
                        {{ showHJsonTextEditor ? 'Hide' : 'Show' }}&nbsp;JSON
                    </button>

                    <button
                        class="ml-md bg-gray-200 rounded py-xs px-sm"
                        @click="groupRegistry.addGroup('')"
                    >
                        Add
                    </button>

                    <button
                        class="ml-md bg-gray-200 rounded py-xs px-sm"
                        @click="groupRegistry.save()"
                    >
                        Save groups
                    </button>
                </nav>

                <section class="ig-tag-json-edit w-full" v-if="showHJsonTextEditor">
                    <textarea class="block w-3/4" rows="20" v-model="jsonToRestore" />

                    <button
                        class="mt-md bg-gray-200 rounded py-xs px-sm"
                        @click="groupRegistry.restoreFromJSON(jsonToRestore)"
                    >
                        Update by JSON
                    </button>
                </section>

                <section
                    class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-auto tag-groups-container"
                    v-else
                >
                    <div
                        class="border border-gray-200 p-sm"
                        v-for="group in groupRegistry.registry"
                        :key="group.key"
                    >
                        <header class="mb-md flex flex-row">
                            <input class="mr-sm w-full" type="text" v-model="group.name" />

                            <button
                                class="rounded py-xs px-sm w-3/12 flex-shrink"
                                :class="group.enabled ? 'bg-green-200' : 'bg-red-200'"
                                @click="group.enabled = !group.enabled"
                            >
                                {{ group.enabled ? 'On' : 'Off' }}
                            </button>
                        </header>

                        <!--                        <textarea-->
                        <!--                            class="w-full"-->
                        <!--                            rows="3"-->
                        <!--                            v-model="group.tagsInText"-->
                        <!--                            @change="group.updateTagsByTexts()"-->
                        <!--                        >-->
                        <!--                        </textarea>-->

                        <DataTable
                            :value="group.tags"
                            :reorderableColumns="true"
                            @rowReorder="onRowReorder($event, group)"
                            responsiveLayout="scroll"
                        >
                            <Column
                                :rowReorder="true"
                                headerStyle="width: 3rem"
                                :reorderableColumn="false"
                            />
                            <Column :field="'name'" :header="'Name'" :key="'name'"></Column>
                        </DataTable>

                        <div class="inline-block">
                            <template
                                v-for="groupInRegistry in groupRegistry.registry"
                                :key="groupInRegistry.key"
                            >
                                <span
                                    v-if="groupInRegistry.name !== group.name"
                                    class="inline-block rounded px-sm py-xs bg-gray-100 mr-sm mb-md"
                                    :class="
                                        group.inheritGroupNames.indexOf(groupInRegistry.name) > -1
                                            ? 'bg-green-100'
                                            : ''
                                    "
                                    @click="group.toggleInheritGroup(groupInRegistry.name)"
                                >
                                    {{ groupInRegistry.name }}
                                </span>
                            </template>
                        </div>

                        <hr class="my-xs" />

                        <pre class="p-xs whitespace-pre-line">{{
                            group
                                .getTags()
                                .filter((each) => !!each)
                                .sort((a, b) => (a.score &lt; b.score ? -1 : 1))
                                .map((each) => '#' + each.name)
                                .join(' ')
                        }}</pre>
                    </div>
                </section>
            </section>
        </div>
    </div>
</template>

<script lang="ts" src="./main.ts"></script>
