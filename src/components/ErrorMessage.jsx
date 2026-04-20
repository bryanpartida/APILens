function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
      {message}
    </div>
  );
}

export default ErrorMessage;
