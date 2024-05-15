import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Stack,
} from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  ImageFileTypes,
  AllFileTypes,
  DocumentFileTypes,
} from "../types/default-file-types";
import uploadIcon from "../assets/upload.png";

interface MultiFileUploadProps {
  placeholder?: string;
  allowUpload?: boolean;
  allowMultipleUploads: boolean;
  viewOnly?: boolean;
  allowDelete?: boolean;
  acceptedFileTypes?: AllFileTypes[];
  imageFileTypes?: ImageFileTypes[];
  documentFileTypes?: DocumentFileTypes[];
  maxFileSize?: number;
}

const DEFAULT_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
interface FileRejection {
  file: File;
  errors: {
    message: string;
    code: string;
  }[];
}

function MultiFileUpload({
  placeholder = "Drag files here",
  allowUpload = true,
  allowMultipleUploads = true,
  viewOnly = false,
  allowDelete = true,
  maxFileSize = DEFAULT_FILE_SIZE,
  imageFileTypes,
  documentFileTypes,
  acceptedFileTypes,
}: MultiFileUploadProps) {
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const determineAcceptedFileTypes = () => {
    if (acceptedFileTypes && acceptedFileTypes.length > 0) {
      return acceptedFileTypes;
    }
    if (imageFileTypes && imageFileTypes.length > 0) {
      return imageFileTypes;
    }
    if (documentFileTypes && documentFileTypes.length > 0) {
      return documentFileTypes;
    }
    return [];
  };

  const acceptedTypes = determineAcceptedFileTypes();

  const onDrop = (accepted: File[], fileRejections: FileRejection[]) => {
    setAcceptedFiles((prev) =>
      allowMultipleUploads ? [...prev, ...accepted] : accepted.slice(0, 1)
    );

    if (fileRejections.length > 0) {
      const messages = fileRejections
        .map((rejection) =>
          rejection.errors
            .map((error) => {
              if (error.code === "file-too-large") {
                return `The file exceeds the size limit of 5 MB. Please choose a smaller file.`;
              }
              return error.message;
            })
            .join(", ")
        )
        .join(", ");
      setErrorMsg(messages);
    } else {
      setErrorMsg(null); // Clear error message if all files are accepted
    }
  };

  const deleteFile = (
    event: React.MouseEvent<HTMLButtonElement>,
    file: File
  ) => {
    event.stopPropagation();
    setAcceptedFiles((prev) => prev.filter((f) => f !== file));
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: allowMultipleUploads,
      disabled: viewOnly || !allowUpload,
      maxSize: maxFileSize,
      accept: { accepted: acceptedTypes },
    });

  const getBorderColor = () => {
    if (isFocused) return "primary.700";
    if (isDragAccept) return "success.main";
    if (isDragReject) return "error";
    return "secondary.500";
  };

  const dropzoneStyle = {
    "&:hover": {
      opacity: 0.72,
      cursor: "pointer",
      borderColor: "primary.700",
    },
    borderColor: getBorderColor(),
  };

  return (
    <Box
      {...getRootProps()} // Apply getRootProps here
      p={2}
      border="2px dashed"
      borderRadius={2}
      sx={dropzoneStyle}
      textAlign="center"
    >
      <input {...getInputProps()} />
      <Stack direction="row" spacing={4} justifyContent="center" pt={2}>
        <img
          src={uploadIcon}
          alt="upload icon"
          style={{ width: "50px", height: "50px" }}
        />
        <Stack spacing={1}>
          <Typography variant="h6">{placeholder}</Typography>
          <Typography color="textSecondary">
            Drop files here or click{" "}
            <span style={{ color: "firebrick", textDecoration: "underline" }}>
              browse
            </span>{" "}
            through your machine
          </Typography>
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
        </Stack>
      </Stack>

      <List>
        {acceptedFiles.map((file) => (
          <ListItem key={`${file.name}-${file.size}`} sx={{ marginBottom: 1 }}>
            <ListItemIcon>
              <InsertDriveFile sx={{ color: "success.main" }} />
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              secondary={`Size: ${file.size / 1024} KB`}
            />
            {!viewOnly && allowDelete && (
              <IconButton
                aria-label={`delete ${file.name}`}
                size="medium"
                onClick={(event) => deleteFile(event, file)}
                color="error"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default MultiFileUpload;
