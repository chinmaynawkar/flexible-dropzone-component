import "./App.css";
import MultiFileUpload from "./components/Dropzone";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";
function App() {
  return (
    <>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <h3>Multi File Upload</h3>
            <Grid item xs={12}>
              <MultiFileUpload
                placeholder="Upload Files"
                allowUpload
                allowMultipleUploads // allows multiple files
                allowDelete
                viewOnly={false}
                documentFileTypes={["application/pdf", "application/msword"]}
              />
            </Grid>
            <h3>Single File Upload</h3>
            <Grid item xs={12}>
              <MultiFileUpload
                placeholder="Upload File"
                allowUpload
                allowMultipleUploads={false} // if set to false, only one file can be uploaded
                allowDelete
                viewOnly={false}
                imageFileTypes={["image/jpeg", "image/jpg", "image/png"]} // accepts only image files
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
export default App;
