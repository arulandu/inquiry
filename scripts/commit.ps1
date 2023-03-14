$message=$args[0]
conda activate tjhsst
python ./scripts/main.py
git add -A; git commit -m "$message"; git push;