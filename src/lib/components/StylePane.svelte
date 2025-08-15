<script lang="ts">
  import type { Snippet } from 'svelte';

  const { children, classes }: { children: Snippet; classes?: string } =
    $props();
</script>

<menu class={`pane ${classes}`}>
  {@render children()}
</menu>

<style>
  .pane {
    display: flex;
    flex-flow: column;

    :global {
      section {
        border-top: 1px solid var(--white);
        border-bottom: 1px solid var(--white);
        border-radius: 0.3rem;
        padding: 1.5rem 0.5rem;
        background: black;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }

        h1,
        h2,
        h3,
        label {
          padding-left: 0.5rem;
        }
      }

      ul {
        padding-left: 0.5rem;
        list-style: none;

        li {
          margin-top: 1rem;
        }

        &:not(.wrapped) {
          display: flex;
          flex-flow: column;
          align-items: flex-start;
        }

        &.wrapped {
          display: flex;
          flex-flow: row;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: space-between;
        }

        &.tree {
          display: block;

          li {
            margin: 0;
          }
        }
      }

      li > button {
        gap: 0.5rem;
        cursor: pointer;

        span,
        input {
          max-width: 150px;
          overflow: clip;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:hover {
          text-decoration: underline;

          span,
          input {
            max-width: none;
          }
        }
      }

      .color-picker {
        opacity: 0.8;

        .wrapper {
          -webkit-transform: translateX(calc(-100% - 2 * var(--spacing-x)))
            translateY(-50%);
          -moz-transform: translateX(calc(-100% - 2 * var(--spacing-x)))
            translateY(-50%);
          -ms-transform: translateX(calc(-100% - 2 * var(--spacing-x)))
            translateY(-50%);
          transform: translateX(calc(-100% - 2 * var(--spacing-x)))
            translateY(-50%);
        }
        button,
        input {
          margin-left: -1rem;
          background: transparent;
        }
      }
    }
  }
</style>
