# Speech Project

## Team Members:
- Vighnesh Mandavkar (B22CS061)
- Ashutosh Kumar (B22CS015)
- Jyotin Goel (B22AI063)

This repo supports LoRA finetuning for Moshi and includes a small inference wrapper for launching the server with finetuned weights.

## Finetuning

Run finetuning with:

```bash
torchrun --nproc-per-node 1 -m train example/moshi_7B.yaml
```

This starts training with the configuration in `example/moshi_7B.yaml`.

## Inference

The inference script uses the `moshi_env` Python environment and launches:

Run it with:

```bash
./finetune_scripts/inference.sh /path/to/lora.safetensors /path/to/config.json
```

Arguments:

- `lora_weight`: path to the LoRA weights file, such as `lora.safetensors`
- `config_path`: path to the consolidated config JSON

Example:

```bash
./finetune_scripts/inference.sh \
  finetune_scripts/runs/checkpoints/checkpoint_002000/consolidated/lora.safetensors \
  finetune_scripts/runs/checkpoints/checkpoint_002000/consolidated/config.json
```
