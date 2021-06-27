<template>
    <div class="grid grid-flow-col grid-cols-12 gap-4">
        <div class="p-md lg:col-span-2">
            <section>
                <p
                    v-for="each in groupRegistry
                        .resolveResults()
                        .filter((each) => !!each)
                        .map((each) => '#' + each)"
                    :key="each"
                >
                    {{ each }}
                </p>
            </section>
        </div>

        <div class="p-md lg:col-span-10">
            <section class="select-none">
                <nav class="flex">
                    <h1 class="flex-grow">Groups</h1>

                    <button
                        class="bg-gray-200 rounded py-xs px-sm"
                        @click="showHJsonTextEditor = !showHJsonTextEditor"
                    >
                        {{ showHJsonTextEditor ? 'Hide' : 'Show' }}&nbsp;JSON
                    </button>

                    <button
                        class="bg-gray-200 rounded py-xs px-sm"
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

                <section class="grid grid-cols-4 gap-2" v-else>
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

                        <textarea
                            class="w-full"
                            v-model="group.tagsInText"
                            @change="group.updateTagsByTexts()"
                        >
                        </textarea>

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

                        <pre class="p-xs">{{
                            group
                                .getTags()
                                .filter((each) => !!each)
                                .map((each) => '#' + each)
                                .join(' ')
                        }}</pre>
                    </div>
                </section>
            </section>
        </div>
    </div>
</template>

<script lang="ts" src="./main.ts"></script>
