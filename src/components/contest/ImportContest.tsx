import { Button, Box, ButtonProps } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React, { useRef } from "react";
import { useSnackbarContext } from "../../contexts/SnackbarContext";
import { Contest } from "../../types";
import { restoreContest } from "../../services/localStorageService";

interface ImportContestProps {
  onImportSuccess?: (contest: Contest) => void;
}

export default function ImportContest({
  onImportSuccess,
  ...props
}: ImportContestProps & ButtonProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openSnackbar } = useSnackbarContext();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.name.endsWith(".svd")) {
      openSnackbar("Please select a .svd file");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const contest: Contest = JSON.parse(text);

        if (!contest.id || !contest.name) {
          openSnackbar("Invalid contest format");
          return;
        }

        const [success, responseText] = restoreContest(contest);
        openSnackbar(responseText);

        if (success && onImportSuccess) {
          onImportSuccess(contest);
        }
      } catch (error) {
        console.error("Error importing contest:", error);
        openSnackbar("Error importing contest. Invalid file format.");
      }
    };

    reader.onerror = () => {
      openSnackbar("Error reading file");
    };

    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept=".svd"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      <Button
        variant="outlined"
        startIcon={<UploadFileIcon />}
        onClick={handleButtonClick}
        {...props}
      >
        Import Contest (.svd)
      </Button>
    </Box>
  );
}
