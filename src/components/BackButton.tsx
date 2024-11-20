export function BackButton() {
  return (
    <button class="btn btn-ghost" onClick={() => history.back()}>
      ←
    </button>
  );
}
