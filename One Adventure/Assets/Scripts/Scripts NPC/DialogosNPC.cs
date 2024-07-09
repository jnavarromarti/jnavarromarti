using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class DialogosNPC : MonoBehaviour
{
    //Script de los dialogos del NPC, va generando el texto conforme el jugador entra en su area y el objeto hijo bocadillo se activa.
    HeroController heroController;
    public GameObject bocadillo;
    public GameObject signal;
    public TextMeshProUGUI dialogos;
    public string[] dialogosNPC;
    public float textSpeed;
    public int index;

    void Start()
    {
        GameObject bocadillo = GameObject.Find("Bocadillo");
        GameObject signal = GameObject.Find("Signal");
        dialogos.text = "";

    }
    void Update()
    {
        if (Input.GetButton("Interact"))
        {
            if (dialogos.text == dialogosNPC[index])
            {
                NextLine();
            }
            else
            {
                dialogos.text = dialogosNPC[index];
                Destroy(bocadillo);
            }
        }
    }
    public void StartDialoge()
    {
        index = 0;
        StartCoroutine(TypeLine());
    }
    IEnumerator TypeLine()
    {
        foreach (char letter in dialogosNPC[index].ToCharArray())
        {
            dialogos.text += letter;
            yield return new WaitForSeconds(textSpeed);
        }
    }
    public void NextLine()
    {
        if (index < dialogosNPC.Length - 1)
        {
            index ++;
            dialogos.text = string.Empty;
            StartCoroutine(TypeLine());
        }
        else
        {
            dialogos.text = string.Empty;
            bocadillo.gameObject.SetActive(false);
        }
    }
    void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.CompareTag("Player"))
        {
            StartDialoge();
            bocadillo.gameObject.SetActive(true);
            dialogos.gameObject.SetActive(true);
            signal.gameObject.SetActive(false);
        }
    }
    void OnTriggerExit2D(Collider2D collider)
    {
        if (collider.CompareTag("Player"))
        {
            bocadillo.gameObject.SetActive(false);
            dialogos.gameObject.SetActive(false);
            StopAllCoroutines();
        }
    }
}
