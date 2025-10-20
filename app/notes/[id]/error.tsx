'use client';

export default function ErrorNoteDetails({ error }: { error: Error }) {
  console.error('Error log:', error);

  return <p>Could not fetch note details. {error.message}</p>;
}
