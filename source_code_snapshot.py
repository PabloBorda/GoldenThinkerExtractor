import os
import json

def scan_files(directory, tree=None):
    """
    Recursively scans the source code files starting from the given directory
    and builds a nested dictionary representing the directory structure and
    including the content of each file.
    """
    if tree is None:
        tree = {}

    for entry in os.listdir(directory):
        path = os.path.join(directory, entry)
        if os.path.isdir(path):
            tree[entry] = {}
            scan_files(path, tree[entry])
        else:
            if path.endswith(('.py', '.js', '.html', '.css')):  # Add or remove file extensions as needed
                with open(path, 'r', encoding='utf-8') as file_content:
                    tree[entry] = file_content.read()

    return tree

def write_json(data, output_filename):
    """
    Writes the provided data to a JSON file with the specified filename.
    """
    with open(output_filename, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    directory_path = '.'
    output_file = "snapshot.json"
    tree_structure = scan_files(directory_path)
    write_json(tree_structure, output_file)
    print(f"Directory structure and file contents have been written to {output_file}")
