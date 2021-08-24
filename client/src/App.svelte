<script>
	import Router from 'svelte-spa-router'
	import Home from './components/Home.svelte';
	import NotFound from './components/NotFound.svelte';
	import Problems from './components/Problems.svelte';
	import Solve from './components/Solve.svelte';
	import Header from './components/sub/Header.svelte';
	import Footer from './components/sub/Footer.svelte';
</script>

<Header />
<Router routes={{
	'/': Home,
	'/problems': Problems,
	'/problems/:qid': Solve,
	'*': NotFound
}} />
<Footer />

<style>
	:global(:root){
		--white: #e9e9e9;
		--black: #000000;
		--red: #ff3235;
	}
</style>
