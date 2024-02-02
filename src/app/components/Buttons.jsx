import { useFormStatus } from "react-dom";

export function SubmitBtn() {
  const status = useFormStatus();
  return (
    <button disabled={status.pending}>
      {!status.pending ? "Send" : "sending..."}
    </button>
  );
}

export function LikeBtn() {
  const status = useFormStatus();
  return (
    <button disabled={status.pending}>
      {!status.pending ? "Like" : "liking..."}
    </button>
  );
}

export function SubmitBtn() {
  const status = useFormStatus();
  return (
    <button disabled={status.pending}>
      {!status.pending ? "Submit" : "submitting..."}
    </button>
  );
}

export function UpdateBtn() {
  const status = useFormStatus();
  return (
    <button disabled={status.pending}>
      {!status.pending ? "Update" : "updating..."}
    </button>
  );
}
