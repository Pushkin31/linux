install ntfs-3g

Create a folder
mkdir /mnt/windows

write /etc/fstab:
UUID=01D4FF75C55ADD70 /mnt/windows                              ntfs-3g  defaults,noatime 0 3
