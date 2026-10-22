package service

import "os"

type TempFile struct {
	dir string
}

func NewTempFile(dir string) *TempFile {
	return &TempFile{
		dir,
	}
}

func (t *TempFile) Create(pattern string) (*os.File, func(), error) {
	f, err := os.CreateTemp(t.dir, pattern)
	if err != nil {
		return nil, nil, err
	}
	cleanup := func() {
		f.Close()
		os.Remove(f.Name())
	}

	return f, cleanup, nil
}
