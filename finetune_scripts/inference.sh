#!/usr/bin/env bash

set -euo pipefail

PYTHON_BIN="/scratch/data/asif_rs/all_env/moshi_env/bin/python"

usage() {
    echo "Usage: $0 <lora_weight> <config_path> [extra moshi.server args]"
    echo
    echo "Example:"
    echo "  $0 /path/to/lora.safetensors /path/to/config.json"
}

if [[ $# -lt 2 ]]; then
    usage
    exit 1
fi

LORA_WEIGHT="$1"
CONFIG_PATH="$2"
shift 2

if [[ ! -x "$PYTHON_BIN" ]]; then
    echo "Error: Python executable not found or not executable: $PYTHON_BIN" >&2
    exit 1
fi

if [[ ! -f "$LORA_WEIGHT" ]]; then
    echo "Error: LoRA weight file not found: $LORA_WEIGHT" >&2
    exit 1
fi

if [[ ! -f "$CONFIG_PATH" ]]; then
    echo "Error: Config file not found: $CONFIG_PATH" >&2
    exit 1
fi

"$PYTHON_BIN" -m moshi.server \
    --gradio-tunnel \
    --lora-weight="$LORA_WEIGHT" \
    --config-path="$CONFIG_PATH" \
    "$@"
