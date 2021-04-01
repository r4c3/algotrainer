<script>
	import Router from 'svelte-spa-router'
	import Home from './components/Home.svelte';
	import Login from './components/Login.svelte';
	import NotFound from './components/NotFound.svelte';
	import Problems from './components/Problems.svelte';
	import Solve from './components/Solve.svelte';
</script>

<Router routes={{
	'/': Home,
	'/login': Login,
	'/problems': Problems,
	'/problem/:qid': Solve,
	'*': NotFound
}} />

<style>

</style>
