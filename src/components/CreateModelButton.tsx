import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useDropzone } from 'react-dropzone'
import { api } from '../stores/supabase'
import './CreateModelButton.css'
type ModelFormData = {
  name: string
  about: string
  // Add other fields as needed
}

export const CreateModelButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<ModelFormData>({
    name: '',
    about: ''
  })

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'model/gltf+json': ['.gltf'] },
    multiple: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      const [error, result] = await api.uploadModel(file.name, file)
      if (error) throw error

      const modelData = {
        ...formData,
        file: result.path
      }

      const [error0, data] = await api.createModel(result)
      if (error0) throw error0

      console.log('Model created successfully:', data)
      setIsOpen(false)
      setFile(null)
      setFormData({ name: '', about: '' })
    } catch (error) {
      console.error('Error creating model:', error)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="button">Create Model</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">Create New Model</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {file ? <p>File selected: {file.name}</p> : <p>Drag and drop a GLTF file here, or click to select one</p>}
            </div>
            {file && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Name (required)</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="about">About (optional)</label>
                  <textarea id="about" name="about" value={formData.about} onChange={handleInputChange} />
                </div>
                {/* Add other form fields as needed */}
                <button type="submit" className="submit-button">
                  Create Model
                </button>
              </>
            )}
          </form>
          <Dialog.Close asChild>
            <button className="close-button" aria-label="Close">
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
