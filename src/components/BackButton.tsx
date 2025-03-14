export function BackButton() {
  return (
    <button
type="button"
      class="btn btn-ghost" onClick={() => history.back()}>
      ←
    </button>
  );
}
