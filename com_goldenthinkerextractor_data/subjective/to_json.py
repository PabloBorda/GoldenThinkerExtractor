import os
import json
import csv

def find_json_files(root_dir):
    json_files = []
    for foldername, subfolders, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.json'):
                json_files.append(os.path.join(foldername, filename))
    return json_files

def extract_json_data(json_file):
    with open(json_file, 'r', encoding='utf-8') as file:
        try:
            data = json.load(file)
            return data
        except json.JSONDecodeError as e:
            print(f"Error decoding {json_file}: {e}")
            return None

def write_to_csv(output_file, json_data_list):
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write header based on the keys of the first JSON object
        if json_data_list:
            first_data = json_data_list[0]
            writer.writerow(first_data.keys())
        
        # Write each JSON object's values as a row
        for data in json_data_list:
            writer.writerow(data.values())

def main(root_dir, output_csv):
    json_files = find_json_files(root_dir)
    json_data_list = []
    
    for json_file in json_files:
        data = extract_json_data(json_file)
        if data is not None:
            json_data_list.append(data)
    
    write_to_csv(output_csv, json_data_list)
    print(f"CSV file '{output_csv}' created successfully.")

if __name__ == "__main__":
    root_directory = '.'  # Starting directory (current directory '.')
    output_csv_file = 'single.csv'AttributeError: 'list' object has no attribute 'keys'
    
    main(root_directory, output_csv_file)
