<template>
    <div id="nav" class="text-left text-sm">
        <router-link to="/"> Home </router-link>
    </div>

    <router-view/>
</template>

<style lang="scss">
#app {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
    //font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;

    #nav {
        padding: 30px;

        a {
            color: #2c3e50;
            font-weight: bold;

            &.router-link-exact-active { color: #42b983; }
        }
    }

    .poketitle {
        font-size: 1.875rem;
        font-weight: 600;
        line-height: 2.25rem;
    }

    .poketext {
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5rem;
    }

    /*
    .brand-color-01-background {
        background-color: $brand-color-01;
        color: #fff;

        &:hover, &.active { background-color: darken($brand-color-01, 15%); }
    }
    */
}
</style>
