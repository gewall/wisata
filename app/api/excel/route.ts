import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Path ke file Excel di folder public
    const filePath = path.join(process.cwd(), 'public', 'data', 'List.xlsx');

    // Membaca file Excel
    const fileBuffer = await fs.readFile(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    // Mengambil sheet pertama dan konversi ke JSON
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // Return data JSON
    return NextResponse.json({ data: jsonData });
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Excel file' },
      { status: 500 }
    );
  }
}
