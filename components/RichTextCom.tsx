import { MaterialIcons } from '@expo/vector-icons';
import { RichTextEditor, RichTextViewer, ActionMap, ActionKey } from '@siposdani87/expo-rich-text-editor';
import { ReactNode, useState } from 'react';
import { StyleSheet } from 'react-native';

const htmlStr = '<p><i><u>Underline italic text</u></i> <b>bold word</b> normal words</p>';

export const RichTextComponents = () => {
    const [value, setValue] = useState<string>('');

    const getColor = (selected: boolean): string => {
      return selected ? 'red' : 'black';
    };

    const getActionMap = (): ActionMap => ({
        [ActionKey.bold]: ({ selected }) => (
            <MaterialIcons name="format-bold" size={24} color={getColor(selected)} />
        ),
        [ActionKey.italic]: ({ selected }) => (
            <MaterialIcons name="format-italic" size={24} color={getColor(selected)} />
        ),
        [ActionKey.underline]: ({ selected }) => (
            <MaterialIcons name="format-underlined" size={24} color={getColor(selected)} />
        ),
        
        [ActionKey.unorderedList]: ({ selected }) => (
            <MaterialIcons name="format-list-bulleted" size={24} color={getColor(selected)} />
        ),
        [ActionKey.orderedList]: ({ selected }) => (
            <MaterialIcons name="format-list-numbered" size={24} color={getColor(selected)} />
        ),
        [ActionKey.undo]: function (_action): ReactNode {
            throw new Error('Function not implemented.');
        },
        [ActionKey.redo]: function (_action): ReactNode {
            throw new Error('Function not implemented.');
        },
        [ActionKey.clear]: function (_action): ReactNode {
            throw new Error('Function not implemented.');
        },
        [ActionKey.code]: function (_action): ReactNode {
            throw new Error('Function not implemented.');
        }
    });
    
    

    const onValueChange = (v: string): void => {
        console.log('onValueChange', v);
        setValue(v);
    };

    return (
        <>
            <RichTextEditor
                minHeight={150}
                value={value}
                selectionColor="green"
                actionMap={getActionMap()}
                onValueChange={onValueChange}
                linkStyle={styles.link}
                textStyle={styles.text}
                containerStyle={styles.editor}
                toolbarStyle={styles.toolbar}
            />
            <RichTextViewer
                value={htmlStr}
                linkStyle={styles.link}
                textStyle={styles.text}
                containerStyle={styles.viewer}
            />
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        // fontFamily: 'Inter_500Medium',
        fontSize: 18,
    },
    link: {
        color: 'green',
    },
    viewer: {
        borderColor: 'green',
        borderWidth: 1,
        padding: 5,
    },
    editor: {
        borderColor: 'blue',
        borderWidth: 1,
        padding: 5,
    },
    toolbar: {
        borderColor: 'red',
        borderWidth: 1,
    },
});