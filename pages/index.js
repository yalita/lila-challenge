import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { withAuth } from 'utils/auth';
import FormServices from 'services/FormServices';
import styles from 'styles/Home.module.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import imgHeader from 'public/assets/Group 1759.png';
import Image from 'next/image';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { convertImage } from 'utils/convertImage';
import { Alert, Snackbar } from '@mui/material';

// ToDo: code this page following Figma design and specifications (https://www.figma.com/file/To3P20ST6fowk2I5kQRCEd/Lila-Frontend-Challenge?node-id=0%3A1&t=Gdm4LTgM1B70TerQ-1).

function Home() {
  /** Sends form data to backend and shows success/error message. */
  const handleSubmit = async (e) => {
    // Hint: I'll leave this submit handler placeholder here for help.
    e.preventDefault();
    const base64 = await convertImage(form.image);

    const { ok, data } = await FormServices.save({
      name: form.name,
      image: base64,
    }); // Hint: complete the code inside the save method too.

    if (ok) {
      setFeedback({
        open: true,
        message: 'Imagen subida exitosamente 😀',
        type: 'success',
      });
      setForm({
        name: '',
        image: '',
      });
      setFilePreview('');
      // ToDo : show success message.
    } else {
      setFeedback({
        open: true,
        message: 'La imagen no se pudo subir 😒',
        type: 'error',
      });

      // ToDo : show error message.
    }
  };

  const [isInZone, setIsInZone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    image: '',
  });
  const [feedback, setFeedback] = useState({
    message: '',
    type: '',
    open: false,
  });

  const fileTypes = ['JPG', 'PNG', 'GIF'];

  const [filePreview, setFilePreview] = useState(null);
  const handleImageChange = (file) => {
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    setForm({ ...form, image: file });
  };

  const handleChangeName = (e) => {
    setForm({ ...form, name: e.target.value });
  };

  const handleDeleteFile = () => {
    setFilePreview(null);
  };

  const handleDragginChange = (val) => setIsInZone(val);

  const handleSnackbar = () => {
    setFeedback({ ...feedback, open: !feedback.open });
  };

  return (
    <main className={styles.container}>
      <Image src={imgHeader} alt="Logo" style={{ width: '100%' }} />
      <form
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <div className={styles.container_general}>
          <div>
            <h1>¡Subí tu foto!</h1>
            <div>
              <div className={styles.nombre_y_input}>
                <label>Nombre de la imagen</label>
                <input
                  className={styles.input_img}
                  value={form.name}
                  onChange={handleChangeName}
                  required
                />
              </div>
              <div className={styles.drap}>
                {filePreview ? (
                  <div className={styles.upload_img2}>
                    <button
                      className={styles.button}
                      onClick={handleDeleteFile}
                    >
                      <DeleteOutlineIcon className={styles.deleteIcon} />
                    </button>
                    <img src={filePreview} className={styles.file} />
                  </div>
                ) : (
                  <FileUploader
                    handleChange={handleImageChange}
                    name="file"
                    hoverTitle="Soltá acá la imagen"
                    onDraggingStateChange={handleDragginChange}
                    required
                  >
                    <div className={styles.upload_img}>
                      {!isInZone && (
                        <>
                          <p>Arrastrá la imagen a esta zona</p>
                          <button className={styles.file_button}>
                            Subir archivo
                            <FileUploadIcon className={styles.icon} />
                          </button>
                        </>
                      )}
                    </div>
                  </FileUploader>
                )}
              </div>
            </div>
          </div>

          <button
            className={filePreview ? styles.send : styles.sendDisabled}
            disabled={!filePreview}
            type={'submit'}
          >
            Enviar
          </button>
        </div>
      </form>
      <Snackbar
        open={feedback.open}
        autoHideDuration={6000}
        onClose={handleSnackbar}
      >
        <Alert
          onClose={handleSnackbar}
          severity={feedback.type}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </main>
  );
}

// ToDo: use withAuth High Order Component to force authentication for this page.
export default withAuth(Home);
