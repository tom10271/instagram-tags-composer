<template>
    <nav class="app-side-menu">
        <ul>
            <li v-for="item in menuItems" :key="item.label" class="px-lg py-xs">
                <template v-if="!(item.items && item.items.length)">
                    <router-link
                        class="w-full inline-block"
                        :to="item.to"
                        @click="
                            $emit('link-clicked');
                            $emit('module-changed', item);
                        "
                    >
                        {{ item.label }}
                    </router-link>
                </template>

                <template v-else>
                    <span @click="toggleExpansion(item)" class="w-full inline-block cursor-pointer">
                        {{ item.label }}
                    </span>

                    <AppSideMenu
                        :menu-items="item.items"
                        :class="{ hidden: !item.isExpanded }"
                        @link-clicked="$emit('link-clicked')"
                        @module-changed="$emit('module-changed', item)"
                    />
                </template>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts" src="./app-side-menu.ts"></script>
