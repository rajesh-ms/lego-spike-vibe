import os
from PyPDF2 import PdfReader
from markdownify import markdownify as md


def convert_pdf_to_markdown(pdf_path, output_dir):
    """
    Converts a PDF file to a Markdown file.

    Args:
        pdf_path (str): Path to the PDF file.
        output_dir (str): Directory to save the Markdown file.
    """
    try:
        # Read the PDF
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"

        # Convert text to Markdown
        markdown_content = md(text)

        # Create output file path
        pdf_filename = os.path.basename(pdf_path)
        markdown_filename = os.path.splitext(pdf_filename)[0] + ".md"
        output_path = os.path.join(output_dir, markdown_filename)

        # Write Markdown content to file
        with open(output_path, "w", encoding="utf-8") as md_file:
            md_file.write(markdown_content)

        print(f"Converted {pdf_path} to {output_path}")
    except Exception as e:
        print(f"Failed to convert {pdf_path}: {e}")


def main():
    """
    Main function to convert all PDFs in the .github/docs directory to Markdown files.
    """
    pdf_dir = os.path.join(".github", "docs")
    output_dir = "markdown_docs"

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Convert each PDF in the directory
    for filename in os.listdir(pdf_dir):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(pdf_dir, filename)
            convert_pdf_to_markdown(pdf_path, output_dir)


if __name__ == "__main__":
    main()
