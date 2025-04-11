from models import Bin, Remedio, db
import json
import os
from datetime import datetime

CONFIG_FILE_PATH = os.path.join(os.path.dirname(__file__), 'dobot', 'config.json')

class InventoryService:
    def __init__(self):
        if not os.path.exists(CONFIG_FILE_PATH):
            raise FileNotFoundError(f"Config file not found at: {CONFIG_FILE_PATH}")
    
    def load_config(self):
        try:
            with open(CONFIG_FILE_PATH, 'r') as file:
                return json.load(file)
        except Exception as e:
            print(f"Error loading config: {str(e)}")
            return {}
    
    def save_config(self, config):
        try:
            with open(CONFIG_FILE_PATH, 'w') as file:
                json.dump(config, file, indent=4)
            return True
        except Exception as e:
            print(f"Error saving config: {str(e)}")
            return False
    
    def get_all_bins(self):
        config = self.load_config()
        bins = []

        for key, value in config.items():
            if not key.startswith('bin_'):
                continue
            
            bin_record = Bin.query.filter_by(id=int(key.split('_')[1])).first()
            
            remedio = Remedio.query.get(bin_record.id_remedio) if bin_record else None
            medicamento = remedio.nome_do_remedio_com_gramagem if remedio else "Desconhecido"
            
            bin_info = {
                'id': key,
                'medicamento': medicamento,
                'validade': remedio.validade if remedio else '',
                'lote': bin_record.lote if bin_record else '',
                'quantidade': bin_record.quantidade if bin_record else 0,
                'posicoes': []
            }

            positions = value if isinstance(value, list) else []
            
            for i, pos in enumerate(positions):
                print(f"Position {i+1}: {pos}") 

                x = str(pos.get("x", ""))
                y = str(pos.get("y", ""))
                z = str(pos.get("z", ""))
                r = str(pos.get("r", ""))
                
                bin_info['posicoes'].append({
                    "x": x,
                    "y": y,
                    "z": z,
                    "r": r,
                    "j1": str(pos.get("j1", "")),
                    "j2": str(pos.get("j2", "")),
                    "j3": str(pos.get("j3", "")),
                    "j4": str(pos.get("j4", "")),
                    "grip": str(pos.get("grip", "")),
                    "suction": str(pos.get("suction", "")),
                    "move": str(pos.get("move", ""))
                })

            bins.append(bin_info)

        return bins

    def get_bin(self, bin_id):
        bins = self.get_all_bins()
        for bin_item in bins:
            if bin_item['id'] == bin_id:
                return bin_item
        return None
    
    def update_bin(self, bin_id, bin_data):
        config = self.load_config()
        
        if bin_id not in config:
            return {'error': f'Bin {bin_id} not found'}, 404
        
        if 'posicoes' in bin_data:
            pos = bin_data['posicoes']
            
            if len(config[bin_id]) >= len(pos):
                for i, p in enumerate(pos):
                    if isinstance(p, dict):
                        try:
                            print(f"Updating position {i+1}: {p}") 

                            config[bin_id][i]['x'] = float(p.get('x', config[bin_id][i]['x']))
                            config[bin_id][i]['y'] = float(p.get('y', config[bin_id][i]['y']))
                            config[bin_id][i]['z'] = float(p.get('z', config[bin_id][i]['z']))
                            config[bin_id][i]['r'] = float(p.get('r', config[bin_id][i]['r']))
                            config[bin_id][i]['j1'] = float(p.get('j1', config[bin_id][i]['j1']))
                            config[bin_id][i]['j2'] = float(p.get('j2', config[bin_id][i]['j2']))
                            config[bin_id][i]['j3'] = float(p.get('j3', config[bin_id][i]['j3']))
                            config[bin_id][i]['j4'] = float(p.get('j4', config[bin_id][i]['j4']))
                            config[bin_id][i]['grip'] = bool(p.get('grip', config[bin_id][i]['grip']))
                            config[bin_id][i]['suction'] = bool(p.get('suction', config[bin_id][i]['suction']))
                            config[bin_id][i]['move'] = p.get('move', config[bin_id][i]['move'])

                            print(f"Position {i+1} updated to: {config[bin_id][i]}")
                        except ValueError as e:
                            return {'error': f"Invalid value in position {i+1}: {str(e)}"}, 400
                    else:
                        return {'error': f"Invalid position data for position {i+1}"}, 400
            else:
                return {'error': f"Not enough positions in the bin data for bin {bin_id}"}, 400
        
        if self.save_config(config):
            return {'message': f'Bin {bin_id} updated successfully'}, 200  
        else:
            return {'error': 'Failed to save configuration'}, 500

    def create_bin(self, bin_data):
        try:
            validade = bin_data.get('validade')
            if validade:
                validade = datetime.strptime(validade, "%Y-%m-%d")
            
            novo_remedio = Remedio(
                nome_do_remedio_com_gramagem=bin_data['medicamento'],
                validade=validade
            )
            db.session.add(novo_remedio)
            db.session.commit()

            new_bin = Bin(
                id_remedio=novo_remedio.id,
                lote=bin_data['lote'],
                quantidade=bin_data['quantidade'],
            )
            db.session.add(new_bin)
            db.session.commit()

            config = self.load_config()

            bin_count = sum(1 for key in config if key.startswith('bin_'))
            new_bin_id = f"bin_{bin_count + 1}"

            new_bin_positions = bin_data['posicoes']
            config[new_bin_id] = new_bin_positions

            if self.save_config(config):
                response_data = {
                    'id': new_bin_id,
                    'id_remedio': novo_remedio.id,
                    'medicamento': bin_data['medicamento'],
                    'validade': bin_data['validade'],
                    'lote': bin_data['lote'],
                    'quantidade': bin_data['quantidade'],
                    'posicoes': new_bin_positions
                }
                return response_data, 201
            else:
                return {'error': 'Failed to save configuration'}, 500
        except Exception as e:
            db.session.rollback()
            print(f"Error creating bin: {str(e)}")
            return {'error': 'Failed to create bin in the database'}, 500
