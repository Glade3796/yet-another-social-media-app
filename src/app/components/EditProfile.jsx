export default function EditProfile({ profile }) {
  return (
    <main>
      edit profile
      <h1>{profile.username}</h1>
      <p>{profile.biography}</p>
    </main>
  );
}
