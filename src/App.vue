<template>
    <div id="app" class="flex flex-col">
        <nav id="main-nav" class="h-2xl w-full border-b-2 border-gray-100 flex flex-row">
            <div
                class="h-2xl w-2xl cursor-pointer flex justify-center items-center bg-white-100"
                @click="toggleModuleMenu"
            >
                <i class="pi pi-bars text-gray-700" style="font-size: 1.5rem"></i>
            </div>

            <nav id="application-menu" class="h-2xl flex-grow items-center flex flex-row">
                <span class="font-bold px-md" v-if="currentModule">{{ currentModule.label }}</span>

                <template v-if="currentModule">
                    <template v-for="item in currentModule.items" :key="item.label">
                        <router-link
                            class="h-full px-md inline-block hover:bg-gray-50 items-center flex"
                            :to="item.to"
                        >
                            {{ item.label }}
                        </router-link>
                    </template>
                </template>
            </nav>

            <div
                class="fixed inset-0 top-2xl z-40"
                @click="toggleModuleMenu"
                :class="{
                    hidden: !isOpeningModuleMenu,
                }"
            ></div>

            <section
                id="module-menu"
                class="py-md fixed top bg-white top-2xl select-none border-r-2 border-b-2 border-gray-100 z-50"
                :class="{
                    hidden: !isOpeningModuleMenu,
                }"
            >
                <AppSideMenu
                    :menu-items="items"
                    ref="moduleMenu"
                    @link-clicked="toggleModuleMenu"
                    @module-changed="onModuleChanged"
                />
            </section>
        </nav>

        <section id="content-container" class="flex-grow">
            <router-view />
        </section>
    </div>
</template>
<script lang="ts" src="./App.ts" />
<style lang="scss" src="./assets/styles/app.scss" />
