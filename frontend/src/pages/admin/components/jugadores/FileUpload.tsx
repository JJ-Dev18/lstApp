import  { ChangeEvent, DragEvent, FC, useEffect, useState } from 'react';
import { Box, Text, IconButton, Input, useColorModeValue, useToast } from "@chakra-ui/react"
import * as XLSX from 'xlsx';
import { Jugador } from '../../../../interfaces/jugador';

interface FileUploadProps {
  onFileUpload: (newPlayers: Jugador[]) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }
  useEffect(() => {
   if(file){
    handleFileUpload()
   }
  }, [file])
  
  const handleFileUpload = () => {
   
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const rows: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        if (rows[0].length === 0) {
          toast({
            title: 'Error de formato u ',
            description: 'El archivo Excel no tiene la estructura esperada.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        const expectedColumns = ['nombre', 'posicion', 'numero','edad','celular','eps','documento'];
        const headers = rows[0];
        // const isValid = headers.every((header: string, index: number) => expectedColumns.includes(header) && header === expectedColumns[index]);
        // const hasAllColumns = expectedColumns.every(column => headers.includes(column));
        console.log(expectedColumns,headers,"jeaders")

        // if (!isValid) {
        //   toast({
        //     title: 'Error de formato i ',
        //     description: 'El archivo Excel no tiene la estructura esperada.',
        //     status: 'error',
        //     duration: 5000,
        //     isClosable: true,
        //   });
        //   return;
        // }
        const newPlayers = rows.slice(1).map((row: any) => ({
          // Asigna un id temporal o manejado por el backend
          nombre: row[0],
          equipoId: 0, // Este se asignará después
          numero: Number(row[2]),
          posicion: row[1],
          fotoUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          edad: row[3],
          celular:row[4],
          eps: row[5],
          documento : row[6],

        }));
        console.log(newPlayers,"new")
        onFileUpload(newPlayers);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const borderColor = useColorModeValue("gray.300", "gray.600")
  const hoverBorderColor = useColorModeValue("gray.400", "gray.500")
  const textColor = useColorModeValue("gray.500", "gray.400")
  const iconColor = useColorModeValue("gray.400", "gray.500")
  const linkColor = useColorModeValue("blue.500", "blue.300")
  return (
    <Box
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    border="2px"
    borderColor={borderColor}
    borderRadius="lg"
    borderStyle="dashed"
    p={6}
    h="64"
    w="full"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    _hover={{ borderColor: hoverBorderColor }}
    transition="border-color 0.2s"
  >
    {file ? (
      <Box textAlign="center">
        <Text color={textColor}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</Text>
        <IconButton
          aria-label="Eliminar Archivo"
          icon={<XIcon />}
          variant="ghost"
          size="sm"
          mt={2}
          onClick={() => setFile(null)}
        />
      </Box>
    ) : (
      <Box textAlign="center">
        <CloudUploadIcon className="h-12 w-12" color={iconColor} />
        <Text color={textColor} mt={4}>
          Drag and drop files here or{" "}
          <Box as="label" color={linkColor} cursor="pointer" _hover={{ textDecoration: "underline" }}>
            click to select
            <Input type="file" accept=".xlsx, .xls" hidden onChange={handleFileSelect} />
          </Box>
        </Text>
      </Box>
    )}
  </Box>
    // <Input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} mb={4} />
  );
};

export default FileUpload;

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}