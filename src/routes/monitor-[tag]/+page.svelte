<script>
    import Monitor from "$lib/components/monitor.svelte";
    import * as Card from "$lib/components/ui/card";
    import Incident from "$lib/components/incident.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { Badge } from "$lib/components/ui/badge";
    import { page } from "$app/stores";
	import { l } from "$lib/i18n/client";

    export let data;

    let hasActiveIncidents = data.openIncidents.length > 0;
</script>

<svelte:head>
	{#if data.monitors.length > 0}
	<title>{data.monitors[0].name} Monitor Page</title>
	{/if}
</svelte:head>
<div class="mt-32"></div>
{#if hasActiveIncidents}
<section class="mx-auto bg-transparent mb-4 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center" id="">
    <div class="grid w-full grid-cols-2 gap-4">
        <div class="col-span-2 md:col-span-1 text-center md:text-left">
            <Badge variant="outline">
				{l(data.lang, 'root.ongoing_incidents')}
			</Badge>
        </div>
    </div>
</section>
<section class="mx-auto mb-8 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center" id="">
    {#each data.openIncidents as incident, i}
    <Incident {incident} state="close" variant="title+body+comments+monitor" monitor="{incident.monitor}" lang="{data.lang}" />
    {/each} 
</section>
{/if} {#if data.monitors.length > 0}
<section class="mx-auto bg-transparent mb-4 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center" id="">
    <div class="grid w-full grid-cols-2 gap-4">
        <div class="col-span-2 md:col-span-1 text-center md:text-left">
            <Badge class="" variant="outline">
				{l(data.lang, 'root.availability_per_component')}
			</Badge>
        </div>
        <div class="col-span-2 md:col-span-1 text-center md:text-right">
            <Badge variant="outline">
                <span class="w-[8px] h-[8px] inline-flex rounded-full bg-api-up opacity-75 mr-1"></span>
                <span class="mr-3">
					{l(data.lang, 'statuses.UP')}
				</span>

                <span class="w-[8px] h-[8px] inline-flex rounded-full bg-api-degraded opacity-75 mr-1"></span>
                <span class="mr-3">
					{l(data.lang, 'statuses.DEGRADED')}
				</span>

                <span class="w-[8px] h-[8px] inline-flex rounded-full bg-api-down opacity-75 mr-1"></span>
                <span class="mr-3">
					{l(data.lang, 'statuses.DOWN')}
				</span>
            </Badge>
        </div>
    </div>
</section>
<section class="mx-auto backdrop-blur-[2px] mb-8 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center">
    <Card.Root class="w-full">
        <Card.Content class="p-0 monitors-card">
            {#each data.monitors as monitor}
            <Monitor {monitor} localTz="{data.localTz}" lang="{data.lang}" />
            {/each}
        </Card.Content>
    </Card.Root>
</section>
{:else}
<section class="mx-auto bg-transparent mb-4 flex w-full max-w-[890px] flex-1 flex-col items-start justify-center" id="">
    <Card.Root class="mx-auto">
        <Card.Content class="pt-4">
            <h1 class="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl text-center">
				{l(data.lang, 'root.no_monitors')}
			</h1>
			<p class="mt-3 text-center">
				{l(data.lang, 'root.read_doc_monitor')}
				<a href="https://kener.ing/docs#h1add-monitors" target="_blank" class="underline">
					{l(data.lang, 'root.here')}
				</a>
			</p>
        </Card.Content>
    </Card.Root>
</section>
{/if}
