import Button from 'components/Button';
import Input from 'components/Input';
import { withAuth } from 'utils/auth';
import FormServices from 'services/FormServices';
import styles from 'styles/Home.module.css';

// ToDo: code this page following Figma design and specifications (https://www.figma.com/file/To3P20ST6fowk2I5kQRCEd/Lila-Frontend-Challenge?node-id=0%3A1&t=Gdm4LTgM1B70TerQ-1).

function Home() {
  /** Sends form data to backend and shows success/error message. */
  const handleSubmit = async (e) => {
    // Hint: I'll leave this submit handler placeholder here for help.
    e.preventDefault();
    const { ok, data } = await FormServices.save({}); // Hint: complete the code inside the save method too.
    if (ok) {
      // ToDo : show success message.
    } else {
      // ToDo : show error message.
    }
  };

  return (
    <main className={styles.container}>
      <h1>¡Subí tus fotos!</h1>
      {/* Good luck! */}
    </main>
  );
}

// ToDo: use withAuth High Order Component to force authentication for this page.
export default Home;
