/**
 * RAGUploaderPage
 * Upload PDFs and query using RAG
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, Search, Trash2, AlertCircle } from 'lucide-react';
import { ragAPI } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import Badge from '../components/ui/Badge';
import { formatDate } from '../utils/helpers';

const RAGUploaderPage = () => {
  const [uploading, setUploading] = useState(false);
  const [querying, setQuerying] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  
  // Fetch documents on mount
  useEffect(() => {
    fetchDocuments();
  }, []);
  
  const fetchDocuments = async () => {
    try {
      const response = await ragAPI.getDocuments();
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setUploading(true);
    setUploadedFile(file);
    
    try {
      const response = await ragAPI.upload(file);
      alert(`Successfully uploaded: ${response.data.filename}`);
      await fetchDocuments();
      setUploadedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });
  
  const handleQuery = async () => {
    if (!query.trim()) return;
    
    setQuerying(true);
    try {
      const response = await ragAPI.query(query);
      setResult(response.data);
    } catch (error) {
      console.error('Error querying:', error);
      alert(error.response?.data?.error || 'Failed to query documents');
    } finally {
      setQuerying(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await ragAPI.deleteDocument(id);
      await fetchDocuments();
      alert('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete document');
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold gradient-text">RAG Uploader</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Upload PDF documents and query them using Retrieval-Augmented Generation
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload & Query Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <Card>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Upload Document</h3>
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
                transition-all
                ${isDragActive 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                }
              `}
            >
              <input {...getInputProps()} />
              
              {uploading ? (
                <Loader text="Uploading and processing..." />
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-blue-100">
                      <Upload className="text-blue-600" size={32} />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-700">
                      {isDragActive ? 'Drop PDF here' : 'Drag & drop PDF here'}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      or click to browse (Max 10MB)
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {uploadedFile && (
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <FileText size={16} />
                <span>{uploadedFile.name}</span>
              </div>
            )}
          </Card>
          
          {/* Query Section */}
          <Card>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Query Documents</h3>
            
            {documents.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <AlertCircle className="mx-auto text-yellow-500" size={48} />
                <p className="text-slate-600">No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  placeholder="Ask a question about your documents..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  icon={Search}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                />
                
                <Button
                  variant="primary"
                  onClick={handleQuery}
                  disabled={querying || !query.trim()}
                  icon={Search}
                  className="w-full"
                >
                  {querying ? 'Searching...' : 'Search'}
                </Button>
              </div>
            )}
          </Card>
          
          {/* Results */}
          {querying && (
            <Card className="text-center py-12">
              <Loader text="Searching documents..." />
            </Card>
          )}
          
          {result && !querying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Answer</h3>
                <p className="text-slate-700 whitespace-pre-wrap mb-6">
                  {result.answer}
                </p>
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-semibold text-slate-700 mb-3">Sources:</h4>
                  <div className="space-y-3">
                    {result.sources.map((source) => (
                      <div
                        key={source.index}
                        className={`
                          p-3 rounded-lg text-sm
                          ${source.used ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'}
                        `}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={source.used ? 'primary' : 'gray'}>
                            [{source.index}]
                          </Badge>
                          <span className="font-medium text-slate-700">
                            {source.document}
                          </span>
                          <Badge variant="gray">
                            {(parseFloat(source.similarity) * 100).toFixed(0)}% match
                          </Badge>
                        </div>
                        <p className="text-slate-600">{source.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
        
        {/* Sidebar - Documents List */}
        <div>
          <Card title="Uploaded Documents" icon={FileText}>
            {documents.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                No documents yet
              </p>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 text-sm truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {doc.chunksCount} chunks
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDate(doc.uploadedAt)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(doc.id)}
                        icon={Trash2}
                        className="!p-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RAGUploaderPage;
