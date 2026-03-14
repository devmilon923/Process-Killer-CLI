# Port Killer CLI ⚡

> A fast, cross-platform utility to safely kill processes using specific ports on Windows, macOS, and Linux.

![npm version](https://img.shields.io/badge/version-1.0.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![node version](https://img.shields.io/badge/node->=12.0.0-brightgreen)

## 🎯 Features

✨ **Cross-Platform** - Works on Windows, macOS, and Linux  
🎯 **Interactive Menu** - Easy OS selection (no need to memorize commands)  
🛡️ **Safe** - Always asks for confirmation before killing processes  
⚙️ **Zero Dependencies** - Uses only Node.js built-in modules  
🚀 **Fast** - Kills ports instantly  
🎨 **Beautiful UI** - Colorized output with Unicode borders  
📊 **Developer Info** - Shows package info on success  

## 📦 Installation

```bash
npm install -g port-killer-cli
```

## 🚀 Quick Start

```bash
port-killer
```

Then follow the prompts:
1. **Select OS** - Choose your operating system (1=Windows, 2=macOS, 3=Linux)
2. **Enter Port** - Type the port number (e.g., 3001, 8080, 5000)
3. **Confirm** - Review the process info and confirm
4. **Done!** - Port is freed and ready to use

## 💡 Common Use Cases

### Kill Node.js Server
```bash
$ port-killer

Select your Operating System:
  1) Windows
  2) macOS
  3) Linux

Enter your choice (1, 2, or 3): 2
✓ macOS selected

Enter the port number you want to stop (e.g., 8087): 3000

➜ Searching for processes using port 3000...

Found process with PID: 12345 using port 3000
Process Name: node
Port: 3000
PID: 12345

Do you want to kill this process? (y/n): y

✓ Port 3000 has been killed!

You can now start your backend server on this port.

╔═══════════════════════════════════════════════════════╗
║      ✨ DEVELOPER INFORMATION ✨                     ║
╠═══════════════════════════════════════════════════════╣
║ Developer............ Milon
║ Tool................ Port Killer CLI
║ Version............. 1.0.0
║ License............. MIT
║ GitHub.............. github.com/devmilon923
║ LinkedIn.............. linkedin.com/in/devmilon
╚═══════════════════════════════════════════════════════╝
```

### Kill Java Application (Port 8080)
```bash
$ port-killer
...
Enter the port number you want to stop: 8080
✓ Port 8080 has been killed!
```

### Kill Python Flask (Port 5000)
```bash
$ port-killer
...
Enter the port number you want to stop: 5000
✓ Port 5000 has been killed!
```

## 🖥️ Supported Operating Systems

| OS | Status | Notes |
|---|--------|-------|
| **Windows** | ✅ Fully Supported | Uses `netstat`, `tasklist`, `taskkill` |
| **macOS** | ✅ Fully Supported | Uses `lsof`, `ps`, `fuser` |
| **Linux** | ✅ Fully Supported | Uses `lsof`, `ps`, `fuser` |

## 📋 Requirements

- **Node.js** >= 12.0.0
- **npm** or **yarn**

## 🔧 How It Works

### Windows
- Uses `netstat -ano` to find process by port
- Uses `tasklist` to get process name
- Uses `taskkill /PID X /F` to terminate process

### macOS & Linux
- Uses `lsof -ti:PORT` to find process by port
- Uses `ps` to get process name
- Uses `fuser -k PORT/tcp` to terminate process

## ⚠️ Troubleshooting

### Port Still Shows as In Use
Some ports enter TIME_WAIT state. Wait 30-60 seconds and try again.

### Permission Denied (macOS/Linux)
The tool may need elevated privileges:
```bash
sudo port-killer
```

### Process Not Found
Verify the port number is correct using:

**Windows:**
```bash
netstat -ano | findstr :3000
```

**macOS/Linux:**
```bash
lsof -i :3000
```

### Port Command Not Found
Make sure you installed it globally:
```bash
npm install -g port-killer-cli
```

## 🗑️ Uninstall

```bash
npm uninstall -g port-killer-cli
```

## 📚 Advanced Usage

### Manual Port Killing (Without Tool)

**Windows:**
```powershell
netstat -ano | findstr :3000
taskkill /PID 12345 /F
```

**macOS/Linux:**
```bash
lsof -i :3000
sudo kill -9 12345
# OR
sudo fuser -k 3000/tcp
```

## 🔄 Update to Latest Version

```bash
npm install -g port-killer-cli@latest
```

## 📝 What's New in v1.0.0

- ✨ Initial release
- 🎨 Beautiful colorized UI with Unicode borders
- 🌍 Cross-platform support (Windows, macOS, Linux)
- 📋 Interactive OS selection menu
- 🎯 Safe operation with confirmation
- 📊 Developer information display
- ⚡ Zero external dependencies

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

[Visit GitHub Repository](https://github.com/devmilon923/port-killer-cli)

## 📄 License

MIT © Milon

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Milon Mia**

- GitHub: [@yourusername](https://github.com/devmilon923)
- npm: [port-killer-cli](https://www.npmjs.com/package/port-killer-cli)
- Email: dev.milon923@gmail.com

## 🙏 Support

If you found this tool helpful, please:
- ⭐ Star on GitHub
- 📢 Share with friends
- 🐛 Report issues
- 💡 Suggest improvements

## FAQ

**Q: Is it safe to use?**  
A: Yes! The tool always asks for confirmation before killing any process.

**Q: Can I use this on Windows?**  
A: Yes! Full native Windows support without WSL.

**Q: Do I need to remember commands?**  
A: No! Interactive menu guides you through every step.

**Q: What if I kill the wrong process?**  
A: The tool shows process details before killing, so you can verify.

**Q: Can I use this in scripts?**  
A: This tool is interactive. For automation, use OS-specific commands directly.

## 🎓 Learn More

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Port Management Guide](https://www.howtouselinux.com/linux/lsof-command)

## 📞 Feedback

Have questions or suggestions? Open an issue on GitHub:
[GitHub Issues](https://github.com/yourusername/port-killer-cli/issues)

---

**Made with ❤️ for Backend Developers**

Happy coding! 🚀