import type { Component } from 'solid-js';

import { DreamSettings } from '~/components/DreamSettings';
import { Gallery } from '~/components/Gallery';
import { NavBar } from '~/components/NavBar';
import { Queue } from '~/components/Queue';

export const App: Component = () => {
  return (
    <main class="flex flex-col h-screen bg-base-100">
      <NavBar />
      <div class="flex justify-self-stretch flex-grow relative">
        <DreamSettings />
        <Gallery />
        <Queue />
      </div>
    </main>
  );
};
