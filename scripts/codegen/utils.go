package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func writeFileAtomically(path string, data []byte, mode os.FileMode) error {
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("create directory: %w", err)
	}

	tempFile, err := os.CreateTemp(dir, ".tmp-*")
	if err != nil {
		return fmt.Errorf("create temp file: %w", err)
	}
	tempPath := tempFile.Name()

	cleanup := func() {
		_ = os.Remove(tempPath)
	}

	if _, err := tempFile.Write(data); err != nil {
		_ = tempFile.Close()
		cleanup()
		return fmt.Errorf("write temp file: %w", err)
	}

	if err := tempFile.Chmod(mode); err != nil {
		_ = tempFile.Close()
		cleanup()
		return fmt.Errorf("chmod temp file: %w", err)
	}

	if err := tempFile.Close(); err != nil {
		cleanup()
		return fmt.Errorf("close temp file: %w", err)
	}

	if err := os.Rename(tempPath, path); err != nil {
		cleanup()
		return fmt.Errorf("rename temp file: %w", err)
	}

	return nil
}
