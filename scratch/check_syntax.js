
import fs from 'fs';

const content = fs.readFileSync('resources/js/Pages/Landing.jsx', 'utf8');

function checkBalance(str) {
    const stack = [];
    const pairs = {
        '{': '}',
        '[': ']',
        '(': ')'
    };
    const open = Object.keys(pairs);
    const close = Object.values(pairs);

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (open.includes(char)) {
            stack.push(char);
        } else if (close.includes(char)) {
            const last = stack.pop();
            if (pairs[last] !== char) {
                console.log(`Mismatch at index ${i}: expected ${pairs[last]}, found ${char}`);
                return false;
            }
        }
    }
    if (stack.length > 0) {
        console.log(`Unclosed symbols: ${stack.join(', ')}`);
        return false;
    }
    return true;
}

// Simple tag balance check (primitive)
function checkTags(str) {
    const tags = str.match(/<[a-zA-Z0-9]+|<\/[a-zA-Z0-9]+>/g);
    const stack = [];
    for (const tag of tags) {
        if (tag.startsWith('</')) {
            const tagName = tag.substring(2, tag.length - 1);
            const last = stack.pop();
            if (last !== tagName) {
                console.log(`Tag mismatch: expected </${last}>, found ${tag}`);
                return false;
            }
        } else {
            const tagName = tag.substring(1);
            // Ignore self-closing tags (this regex is too simple for that, but let's see)
            if (!str.substring(str.indexOf(tag)).split('>')[0].endsWith('/')) {
                stack.push(tagName);
            }
        }
    }
    return stack.length === 0;
}

console.log('Checking braces/brackets...');
checkBalance(content);
// console.log('Checking tags...');
// checkTags(content);
